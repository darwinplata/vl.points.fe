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
    getters: {
        getPointInfo(state) {
            return (pointId) => {
                return state.points.find((point) =>
                    point.id === parseInt(pointId)
                )
            }
        },
    },
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
        async destroyPoint(pointId) {
            try {
                console.log('Parametro en el storage: ' + pointId);
                this.loading = true;
                this.errors.message = null;
                const response = await api.points.deletePoint(pointId);
                const arrPoints = await response.json();

                console.log(arrPoints);

                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.errors.message = 'Something went wrong loading points.';
            }
        },
        async udpatePoint({ id, name, x, y }) {
            try {
                this.loading = true;
                this.errors.message = null;
                const response = await api.points.updatePoint({ id, name, x, y });
                const arrPoints = await response.json();

                console.log(arrPoints);

                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.errors.message = 'Something went wrong loading points.';
            }
        },
        async createPoint({ name, x, y }) {
            try {
                this.loading = true;
                this.errors.message = null;
                const response = await api.points.createPoint({ name, x, y });
                const arrPoints = await response.json();

                console.log(arrPoints);

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