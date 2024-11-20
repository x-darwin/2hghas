import { Observable } from '@nativescript/core';
import { ExoPlayer } from 'nativescript-exoplayer';

export class StreamPlayer extends Observable {
    private player: ExoPlayer;
    private _isPlaying = false;
    private _streamUrl = '';
    private _error = '';

    constructor() {
        super();
        this.player = new ExoPlayer();
        
        // Handle player events
        this.player.on('error', (args) => {
            this.error = `Playback error: ${args.error}`;
            this.isPlaying = false;
        });
        
        this.player.on('ready', () => {
            this.error = '';
        });
    }

    get streamUrl(): string {
        return this._streamUrl;
    }

    set streamUrl(value: string) {
        if (this._streamUrl !== value) {
            this._streamUrl = value;
            this.notifyPropertyChange('streamUrl', value);
        }
    }

    get isPlaying(): boolean {
        return this._isPlaying;
    }

    set isPlaying(value: boolean) {
        if (this._isPlaying !== value) {
            this._isPlaying = value;
            this.notifyPropertyChange('isPlaying', value);
        }
    }

    get error(): string {
        return this._error;
    }

    set error(value: string) {
        if (this._error !== value) {
            this._error = value;
            this.notifyPropertyChange('error', value);
        }
    }

    startStream(): void {
        if (!this.streamUrl) {
            this.error = 'Please enter an RTMP URL';
            return;
        }

        if (!this.streamUrl.startsWith('rtmp://')) {
            this.error = 'Invalid RTMP URL format';
            return;
        }

        try {
            this.player.src = this.streamUrl;
            this.isPlaying = true;
            this.error = '';
        } catch (err) {
            this.error = `Failed to start stream: ${err.message}`;
            this.isPlaying = false;
        }
    }

    stopStream(): void {
        try {
            this.player.pause();
            this.isPlaying = false;
            this.error = '';
        } catch (err) {
            this.error = `Failed to stop stream: ${err.message}`;
        }
    }

    dispose(): void {
        if (this.player) {
            this.player.destroy();
        }
    }
}