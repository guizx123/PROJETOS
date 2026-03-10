import { Audio } from 'expo-av';

// Reliable URLs for barcode beeps
const FALLBACK_BEEP_URL = 'https://www.soundjay.com/buttons/sounds/button-20.mp3';
const LOCAL_BEEP = require('../../assets/sounds/beep.mp3');

class AudioService {
    private beepSound: Audio.Sound | null = null;
    private isInitialized = false;

    async init() {
        if (this.isInitialized) return;
        try {
            // Basic setup - avoid complex modes that might fail in different environments
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                shouldDuckAndroid: false, // Don't lower volume for others
                playThroughEarpieceAndroid: false, // Ensure main speaker
                staysActiveInBackground: true,
            }).catch(err => console.warn('Audio.setAudioModeAsync warning:', err));

            // Try to load local sound first, then remote
            try {
                await this.loadSound(LOCAL_BEEP);
                console.log('Audio Service: Local beep loaded');
            } catch (localErr) {
                console.warn('Local beep load failed, trying remote:', localErr);
                await this.loadSound(FALLBACK_BEEP_URL).catch(remoteErr => {
                    console.warn('All beep sources failed:', remoteErr);
                });
            }

            this.isInitialized = true;
            console.log('Audio Service status: Ready');
        } catch (error) {
            // We catch but don't throw to prevent app-breaking errors
            console.warn('Audio Service Init Warning:', error);
        }
    }

    private async loadSound(source: any) {
        try {
            if (this.beepSound) {
                try {
                    await this.beepSound.unloadAsync();
                } catch (e) { /* ignore */ }
            }

            const isRemote = typeof source === 'string';
            const { sound } = await Audio.Sound.createAsync(
                isRemote ? { uri: source } : source,
                { shouldPlay: false, volume: 1.0 }
            );
            this.beepSound = sound;
        } catch (error) {
            throw error; // Let the caller decide how to handle
        }
    }

    async playBeep() {
        try {
            if (!this.beepSound) {
                await this.init();
            }

            if (!this.beepSound) {
                // Secondary attempt during playback if init failed
                try {
                    await this.loadSound(LOCAL_BEEP);
                } catch (e) {
                    await this.loadSound(FALLBACK_BEEP_URL).catch(_err => { });
                }
            }

            if (this.beepSound) {
                const status = await this.beepSound.getStatusAsync();
                if (status.isLoaded) {
                    await this.beepSound.setPositionAsync(0);
                    await this.beepSound.playAsync();
                } else {
                    await this.loadSound(FALLBACK_BEEP_URL);
                    await this.beepSound?.playAsync();
                }
            } else {
                console.warn('Could not initialize beepSound');
            }
        } catch (error) {
            console.warn('Error playing beep (silent failure):', error);
        }
    }

    async unload() {
        if (this.beepSound) {
            try {
                await this.beepSound.unloadAsync();
            } catch (e) { /* ignore */ }
            this.beepSound = null;
            this.isInitialized = false;
        }
    }
}

export const audioService = new AudioService();
