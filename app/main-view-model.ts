import { Observable, VideoPlayer } from '@nativescript/core';

export class MainViewModel extends Observable {
    private _rtmpUrl: string = '';
    private _isPlaying: boolean = false;
    private _errorMessage: string = '';
    private _player: VideoPlayer;

    constructor() {
        super();
    }

    get rtmpUrl(): string {
        return this._rtmpUrl;
    }

    set rtmpUrl(value: string) {
        if (this._rtmpUrl !== value) {
            this._rtmpUrl = value;
            this.notifyPropertyChange('rtmpUrl', value);
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

    get errorMessage(): string {
        return this._errorMessage;
    }

    set errorMessage(value: string) {
        if (this._errorMessage !== value) {
            this._errorMessage = value;
            this.notifyPropertyChange('errorMessage', value);
        }
    }

    toggleStream() {
        if (!this.isPlaying) {
            if (!this.rtmpUrl) {
                this.errorMessage = 'Please enter an RTMP URL';
                return;
            }

            if (!this.rtmpUrl.startsWith('rtmp://')) {
                this.errorMessage = 'Invalid RTMP URL format';
                return;
            }

            try {
                this.isPlaying = true;
                this.errorMessage = '';
            } catch (error) {
                this.errorMessage = `Failed to connect: ${error.message}`;
            }
        } else {
            try {
                this.isPlaying = false;
                this.errorMessage = '';
            } catch (error) {
                this.errorMessage = `Failed to stop stream: ${error.message}`;
            }
        }
    }
}