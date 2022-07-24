import { defineStore } from 'pinia';
import api from '../api';

const initialState = {
    points: [],
    loading: false,
    errors: {
        message: null,
    },
};

export const usePointsStore = defineStore('points', {
    state: () => ({...initialState }),
    /* getters: {
        isNoTrips(state) {
            return !state.pendingTrips && state.trips.length < 1;
        },
        getWalletError(state) {
            return state.errors.message;
        },
    }, */
    actions: {
        async fetchAllPoints() {
            try {
                this.loading = true;
                this.errors.message = null;
                const response = await api.points.getAllPoints();
                const arrPoints = await response.json();

                if (arrPoints.length === 0) {
                    console.log('No registered points.');
                } else {
                    this.points = arrPoints;
                }

                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.errors.message = 'Something went wrong loading points.';
            }
        },
        resetPointsState() {
            Object.assign(this, initialState);
        },
    },
});