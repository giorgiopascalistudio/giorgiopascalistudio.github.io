// J.S.O.C. Navigation System
// GPS Tracking & UTM Conversion Application

class JSocNavigationApp {
    constructor() {
        this.currentPosition = null;
        this.targetWaypoint = null;
        this.waypoints = [];
        this.watchId = null;
        this.deviceHeading = 0;
        this.useKilometers = false;
        this.compassActive = false;
        this.compassSupported = false;
        this.orientationListener = null;
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.requestGeolocation();
        this.checkCompassSupport();
        this.updateWaypointSelect();
        this.updateCompassStatus('Bussola disattivata', 'inactive');
    }



    setupEventListeners() {
        // Waypoint selection
        document.getElementById('waypointSelect').addEventListener('change', (e) => {
            this.selectWaypoint(e.target.value);
        });

        // Control buttons
        document.getElementById('loadWaypointsBtn').addEventListener('click', () => {
            this.openModal('loadModal');
        });

        document.getElementById('addWaypointBtn').addEventListener('click', () => {
            this.openModal('loadModal');
            this.switchTab('manual');
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportWaypoints();
        });

        document.getElementById('unitsToggle').addEventListener('click', () => {
            this.toggleUnits();
        });

        // Compass activation
        document.getElementById('activateCompassBtn').addEventListener('click', () => {
            this.activateCompass();
        });

        // Modal controls
        document.getElementById('closeLoadModal').addEventListener('click', () => {
            this.closeModal('loadModal');
        });

        document.getElementById('modalOverlay').addEventListener('click', () => {
            this.closeModal('loadModal');
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // File upload
        document.getElementById('dropZone').addEventListener('click', () => {
            document.getElementById('csvFile').click();
        });

        document.getElementById('csvFile').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files[0]);
        });

        // Drag and drop
        const dropZone = document.getElementById('dropZone');
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file) {
                this.handleFileUpload(file);
            }
        });

        // Manual waypoint form
        document.getElementById('waypointForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addManualWaypoint();
        });
    }

    requestGeolocation() {
        if (!navigator.geolocation) {
            this.updateStatus('GPS non supportato', false);
            return;
        }

        this.updateStatus('Acquisizione GPS...', false);

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 1000
        };

        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.handlePositionUpdate(position),
            (error) => this.handleGeolocationError(error),
            options
        );
    }

    handlePositionUpdate(position) {
        this.currentPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude || 0,
            accuracy: position.coords.accuracy
        };

        this.updateStatus(`GPS OK (±${Math.round(this.currentPosition.accuracy)}m)`, true);
        this.updateCurrentPosition();
        this.updateNavigation();
    }

    handleGeolocationError(error) {
        let message = 'Errore GPS: ';
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message += 'Permessi negati';
                break;
            case error.POSITION_UNAVAILABLE:
                message += 'Posizione non disponibile';
                break;
            case error.TIMEOUT:
                message += 'Timeout';
                break;
            default:
                message += 'Errore sconosciuto';
                break;
        }
        this.updateStatus(message, false);
    }

    checkCompassSupport() {
        this.compassSupported = 'DeviceOrientationEvent' in window;
        
        if (!this.compassSupported) {
            this.updateCompassStatus('Bussola non supportata', 'error');
            document.getElementById('activateCompassBtn').disabled = true;
        }
    }

    async activateCompass() {
        if (!this.compassSupported) {
            alert('La bussola non è supportata su questo dispositivo.');
            return;
        }

        if (this.compassActive) {
            this.deactivateCompass();
            return;
        }

        try {
            this.updateCompassStatus('Richiesta permessi...', 'requesting');
            
            // Gestione permessi iOS 13+
            if (typeof DeviceOrientationEvent !== 'undefined' && 
                typeof DeviceOrientationEvent.requestPermission === 'function') {
                
                const permissionState = await DeviceOrientationEvent.requestPermission();
                
                if (permissionState === 'granted') {
                    this.startCompass();
                } else {
                    throw new Error('Permessi negati per i sensori di orientamento');
                }
            } else {
                // Android e altri browser
                this.startCompass();
            }
        } catch (error) {
            console.error('Errore attivazione bussola:', error);
            this.updateCompassStatus('Errore: ' + error.message, 'error');
            
            if (error.message.includes('permessi')) {
                alert('Permessi negati. Abilita i sensori di movimento nelle impostazioni del browser.');
            } else {
                alert('Errore nell\'attivazione della bussola: ' + error.message);
            }
        }
    }

    startCompass() {
        this.orientationListener = (event) => this.handleOrientation(event);
        window.addEventListener('deviceorientation', this.orientationListener);
        
        this.compassActive = true;
        this.updateCompassStatus('Bussola attiva', 'active');
        
        const btn = document.getElementById('activateCompassBtn');
        btn.innerHTML = '<span class="btn-icon">🛑</span> DISATTIVA BUSSOLA';
        btn.classList.remove('btn--primary');
        btn.classList.add('btn--secondary');
        
        document.querySelector('.compass-container').classList.add('active');
        
        // Timeout per verificare se riceviamo dati
        setTimeout(() => {
            if (this.compassActive && this.deviceHeading === 0) {
                this.updateCompassStatus('Calibra il dispositivo ruotandolo', 'warning');
            }
        }, 3000);
    }

    deactivateCompass() {
        if (this.orientationListener) {
            window.removeEventListener('deviceorientation', this.orientationListener);
            this.orientationListener = null;
        }
        
        this.compassActive = false;
        this.deviceHeading = 0;
        this.updateCompassStatus('Bussola disattivata', 'inactive');
        
        const btn = document.getElementById('activateCompassBtn');
        btn.innerHTML = '<span class="btn-icon">🧭</span> ATTIVA BUSSOLA';
        btn.classList.remove('btn--secondary');
        btn.classList.add('btn--primary');
        
        document.querySelector('.compass-container').classList.remove('active');
        
        // Reset compass display
        this.updateCompass();
    }

    handleOrientation(event) {
        if (!this.compassActive) return;
        
        // Handle different browser implementations
        let heading = null;
        
        if (event.webkitCompassHeading !== undefined) {
            // iOS Safari
            heading = event.webkitCompassHeading;
        } else if (event.alpha !== null) {
            // Android Chrome and others
            heading = 360 - event.alpha;
        }
        
        if (heading !== null) {
            // Normalize heading to 0-360
            this.deviceHeading = (heading + 360) % 360;
            this.updateCompass();
            
            // Update status on first valid reading
            if (this.deviceHeading > 0) {
                this.updateCompassStatus('Bussola funzionante', 'active');
            }
        }
    }

    updateCompassStatus(message, status) {
        document.getElementById('compassStatusText').textContent = message;
        const indicator = document.getElementById('compassIndicator');
        
        // Remove all status classes
        indicator.classList.remove('active', 'error', 'requesting', 'warning');
        
        // Add appropriate class
        if (status && status !== 'inactive') {
            indicator.classList.add(status);
        }
    }

    updateCompass() {
        const northNeedle = document.getElementById('northNeedle');
        const targetNeedle = document.getElementById('targetNeedle');
        const bearingText = document.getElementById('bearingText');

        if (!this.compassActive) {
            // Reset compass when inactive
            northNeedle.style.transform = 'translate(-50%, -80px) rotate(0deg)';
            targetNeedle.classList.remove('active');
            bearingText.textContent = '---°';
            return;
        }

        // Update north needle
        northNeedle.style.transform = `translate(-50%, -80px) rotate(${this.deviceHeading}deg)`;

        // Update target needle if waypoint is selected
        if (this.targetWaypoint && this.currentPosition) {
            const bearing = this.calculateBearing(
                this.currentPosition.latitude,
                this.currentPosition.longitude,
                this.targetWaypoint.latitude,
                this.targetWaypoint.longitude
            );

            const relativeBearing = (bearing - this.deviceHeading + 360) % 360;
            targetNeedle.style.transform = `translate(-50%, -60px) rotate(${relativeBearing}deg)`;
            targetNeedle.classList.add('active');
            bearingText.textContent = `${Math.round(bearing)}°`;
        } else {
            targetNeedle.classList.remove('active');
            bearingText.textContent = this.compassActive ? `${Math.round(this.deviceHeading)}°` : '---°';
        }
    }

    updateCurrentPosition() {
        if (!this.currentPosition) return;

        const utm = this.latLonToUTM(this.currentPosition.latitude, this.currentPosition.longitude);
        const utmText = `${utm.zone} ${Math.round(utm.easting)} ${Math.round(utm.northing)}`;
        const altText = Math.round(this.currentPosition.altitude);

        document.getElementById('currentUTM').textContent = utmText;
        document.getElementById('currentAlt').textContent = altText;
    }

    updateNavigation() {
        if (!this.targetWaypoint || !this.currentPosition) {
            this.clearWaypointDetails();
            return;
        }

        const targetUTM = {
            zone: this.targetWaypoint.zone,
            easting: this.targetWaypoint.easting,
            northing: this.targetWaypoint.northing
        };

        const currentUTM = this.latLonToUTM(this.currentPosition.latitude, this.currentPosition.longitude);

        // Calculate distance using UTM coordinates
        const distance = this.calculateUTMDistance(currentUTM, targetUTM);
        const bearing = this.calculateBearing(
            this.currentPosition.latitude,
            this.currentPosition.longitude,
            this.targetWaypoint.latitude,
            this.targetWaypoint.longitude
        );

        const elevation = (this.targetWaypoint.altitude || 0) - this.currentPosition.altitude;
        const elevationText = elevation >= 0 ? `+${Math.round(elevation)}` : Math.round(elevation);

        // Update display
        document.getElementById('targetName').textContent = this.targetWaypoint.name;
        document.getElementById('targetDistance').textContent = this.formatDistance(distance);
        document.getElementById('targetBearing').textContent = `${Math.round(bearing)}°`;
        document.getElementById('targetElevation').textContent = `${elevationText}m`;

        this.updateCompass();
    }

    selectWaypoint(waypointName) {
        if (!waypointName) {
            this.targetWaypoint = null;
            this.clearWaypointDetails();
            return;
        }

        const waypoint = this.waypoints.find(wp => wp.name === waypointName);
        if (waypoint) {
            // Convert UTM to lat/lon for bearing calculations
            const latLon = this.utmToLatLon(waypoint.easting, waypoint.northing, waypoint.zone);
            this.targetWaypoint = {
                ...waypoint,
                latitude: latLon.latitude,
                longitude: latLon.longitude
            };
            this.updateNavigation();
        }
    }

    clearWaypointDetails() {
        document.getElementById('targetName').textContent = '---';
        document.getElementById('targetDistance').textContent = '---';
        document.getElementById('targetBearing').textContent = '---°';
        document.getElementById('targetElevation').textContent = '---m';
        
        const targetNeedle = document.getElementById('targetNeedle');
        targetNeedle.classList.remove('active');
        
        document.getElementById('bearingText').textContent = '---°';
    }

    updateWaypointSelect() {
        const select = document.getElementById('waypointSelect');
        select.innerHTML = '<option value="">Seleziona waypoint...</option>';
        
        if (this.waypoints.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Nessun waypoint caricato';
            option.disabled = true;
            select.appendChild(option);
        } else {
            this.waypoints.forEach(waypoint => {
                const option = document.createElement('option');
                option.value = waypoint.name;
                option.textContent = waypoint.name;
                select.appendChild(option);
            });
        }
    }

    updateStatus(message, connected) {
        document.getElementById('statusText').textContent = message;
        const indicator = document.getElementById('statusIndicator');
        
        if (connected) {
            indicator.classList.add('connected');
        } else {
            indicator.classList.remove('connected');
        }
    }

    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
        document.getElementById('modalOverlay').classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        document.getElementById('modalOverlay').classList.remove('active');
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}Tab`);
        });
    }

    handleFileUpload(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.parseCSV(e.target.result);
                this.closeModal('loadModal');
                alert('Waypoint caricati con successo!');
            } catch (error) {
                alert(`Errore nel caricamento: ${error.message}`);
            }
        };
        reader.readAsText(file);
    }

    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) {
            throw new Error('File CSV vuoto o non valido');
        }

        // Skip header row
        const dataLines = lines.slice(1);
        const newWaypoints = [];

        dataLines.forEach((line, index) => {
            const columns = line.split(',').map(col => col.trim());
            
            if (columns.length < 4) {
                throw new Error(`Riga ${index + 2}: formato non valido`);
            }

            const [name, zone, easting, northing, altitude] = columns;

            // Validate data
            if (!name || !zone || !easting || !northing) {
                throw new Error(`Riga ${index + 2}: campi obbligatori mancanti`);
            }

            // Validate UTM zone format
            const validZones = ['32T', '32U', '33T', '33U'];
            if (!validZones.includes(zone.toUpperCase())) {
                throw new Error(`Riga ${index + 2}: zona UTM non supportata (${zone}). Zone supportate: ${validZones.join(', ')}`);
            }

            const eastingNum = parseFloat(easting);
            const northingNum = parseFloat(northing);
            const altitudeNum = altitude ? parseFloat(altitude) : 0;

            if (isNaN(eastingNum) || isNaN(northingNum)) {
                throw new Error(`Riga ${index + 2}: coordinate non valide`);
            }

            // Validate UTM coordinate ranges
            if (eastingNum < 0 || eastingNum > 999999) {
                throw new Error(`Riga ${index + 2}: Easting fuori range (0-999999)`);
            }
            if (northingNum < 0 || northingNum > 9999999) {
                throw new Error(`Riga ${index + 2}: Northing fuori range (0-9999999)`);
            }

            newWaypoints.push({
                name,
                zone: zone.toUpperCase(),
                easting: eastingNum,
                northing: northingNum,
                altitude: altitudeNum
            });
        });

        // Replace existing waypoints
        this.waypoints = newWaypoints;
        this.updateWaypointSelect();
        
        // Clear current selection
        this.targetWaypoint = null;
        this.clearWaypointDetails();
        document.getElementById('waypointSelect').value = '';
    }

    addManualWaypoint() {
        const form = document.getElementById('waypointForm');

        const waypoint = {
            name: document.getElementById('wpName').value.trim(),
            zone: document.getElementById('wpZone').value,
            easting: parseFloat(document.getElementById('wpEasting').value),
            northing: parseFloat(document.getElementById('wpNorthing').value),
            altitude: parseFloat(document.getElementById('wpAltitude').value) || 0
        };

        // Validate
        if (!waypoint.name) {
            alert('Il nome del waypoint è obbligatorio');
            return;
        }
        
        if (isNaN(waypoint.easting) || isNaN(waypoint.northing)) {
            alert('Le coordinate Easting e Northing devono essere numeriche');
            return;
        }
        
        // Validate coordinate ranges
        if (waypoint.easting < 0 || waypoint.easting > 999999) {
            alert('Easting deve essere compreso tra 0 e 999999');
            return;
        }
        
        if (waypoint.northing < 0 || waypoint.northing > 9999999) {
            alert('Northing deve essere compreso tra 0 e 9999999');
            return;
        }

        // Check for duplicate names
        if (this.waypoints.some(wp => wp.name === waypoint.name)) {
            alert('Nome waypoint già esistente');
            return;
        }

        this.waypoints.push(waypoint);
        this.updateWaypointSelect();
        this.closeModal('loadModal');
        form.reset();
        alert('Waypoint aggiunto con successo!');
    }

    exportWaypoints() {
        if (this.waypoints.length === 0) {
            alert('Nessun waypoint da esportare');
            return;
        }

        const header = 'Nome,Zona,Easting,Northing,Altitudine\n';
        const rows = this.waypoints.map(wp => 
            `${wp.name},${wp.zone},${wp.easting},${wp.northing},${wp.altitude}`
        ).join('\n');

        const csvContent = header + rows;
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `jsoc_waypoints_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    toggleUnits() {
        this.useKilometers = !this.useKilometers;
        document.getElementById('unitsText').textContent = this.useKilometers ? 'Km' : 'Metri';
        this.updateNavigation();
    }

    formatDistance(meters) {
        if (this.useKilometers && meters >= 1000) {
            return `${(meters / 1000).toFixed(2)} km`;
        }
        return `${Math.round(meters)} m`;
    }

    // UTM Conversion Functions
    latLonToUTM(lat, lon) {
        // Simplified UTM conversion - for production use a proper library
        const zone = Math.floor((lon + 180) / 6) + 1;
        const zoneLetter = lat >= 0 ? 'N' : 'S';
        
        // Convert to radians
        const latRad = lat * Math.PI / 180;
        const lonRad = lon * Math.PI / 180;
        
        // UTM parameters
        const k0 = 0.9996;
        const a = 6378137; // WGS84 semi-major axis
        const e = 0.0818191908; // WGS84 eccentricity
        
        // Central meridian
        const lonOrigin = (zone - 1) * 6 - 180 + 3;
        const lonOriginRad = lonOrigin * Math.PI / 180;
        
        // Calculate UTM coordinates (simplified)
        const N = a / Math.sqrt(1 - e * e * Math.sin(latRad) * Math.sin(latRad));
        const T = Math.tan(latRad) * Math.tan(latRad);
        const C = e * e * Math.cos(latRad) * Math.cos(latRad) / (1 - e * e);
        const A = Math.cos(latRad) * (lonRad - lonOriginRad);
        
        const M = a * ((1 - e * e / 4 - 3 * e * e * e * e / 64) * latRad
                     - (3 * e * e / 8 + 3 * e * e * e * e / 32) * Math.sin(2 * latRad)
                     + (15 * e * e * e * e / 256) * Math.sin(4 * latRad));
        
        const easting = k0 * N * (A + (1 - T + C) * A * A * A / 6) + 500000;
        const northing = k0 * (M + N * Math.tan(latRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24));
        
        return {
            zone: zone + zoneLetter,
            easting: easting,
            northing: northing >= 0 ? northing : northing + 10000000
        };
    }

    utmToLatLon(easting, northing, zoneStr) {
        // Simplified UTM to lat/lon conversion
        const zone = parseInt(zoneStr.slice(0, -1));
        const hemisphere = zoneStr.slice(-1);
        
        // UTM parameters
        const k0 = 0.9996;
        const a = 6378137;
        const e = 0.0818191908;
        
        // Adjust northing for southern hemisphere
        let adjustedNorthing = northing;
        if (hemisphere === 'S') {
            adjustedNorthing -= 10000000;
        }
        
        // Central meridian
        const lonOrigin = (zone - 1) * 6 - 180 + 3;
        
        // Remove false easting
        const x = easting - 500000;
        const y = adjustedNorthing;
        
        // Calculate latitude (simplified)
        const M = y / k0;
        const mu = M / (a * (1 - e * e / 4 - 3 * e * e * e * e / 64));
        
        const lat = mu + (3 * e * e / 2 - 27 * e * e * e * e / 32) * Math.sin(2 * mu)
                      + (21 * e * e * e * e / 16) * Math.sin(4 * mu);
        
        // Calculate longitude (simplified)
        const N = a / Math.sqrt(1 - e * e * Math.sin(lat) * Math.sin(lat));
        const T = Math.tan(lat) * Math.tan(lat);
        const C = e * e * Math.cos(lat) * Math.cos(lat) / (1 - e * e);
        const R = a * (1 - e * e) / Math.pow(1 - e * e * Math.sin(lat) * Math.sin(lat), 1.5);
        const D = x / (N * k0);
        
        const lon = lonOrigin + (D - (1 + 2 * T + C) * D * D * D / 6) * 180 / Math.PI;
        
        return {
            latitude: lat * 180 / Math.PI,
            longitude: lon
        };
    }

    calculateUTMDistance(utm1, utm2) {
        const deltaE = utm2.easting - utm1.easting;
        const deltaN = utm2.northing - utm1.northing;
        return Math.sqrt(deltaE * deltaE + deltaN * deltaN);
    }

    calculateBearing(lat1, lon1, lat2, lon2) {
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const lat1Rad = lat1 * Math.PI / 180;
        const lat2Rad = lat2 * Math.PI / 180;
        
        const y = Math.sin(dLon) * Math.cos(lat2Rad);
        const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
        
        let bearing = Math.atan2(y, x) * 180 / Math.PI;
        return (bearing + 360) % 360;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JSocNavigationApp();
});