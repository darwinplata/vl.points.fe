const points = (apiBase) => ({
    async getAllPoints() {
        return await fetch(`${apiBase}/points`);
    },
    async getPoint({ pointId }) {
        return await fetch(`${apiBase}/points/${pointId}`);
    },
    async createPoint({ name, x, y }) {
        const fd = new FormData();
        fd.append('name', name);
        fd.append('x', x);
        fd.append('y', y);
        return await fetch(`${apiBase}/points`, { method: 'POST', body: fd });
    },
    async updatePoint({ name, x, y }) {
        const fd = new FormData();
        fd.append('name', name);
        fd.append('x', x);
        fd.append('y', y);
        return await fetch(`${apiBase}/points/${pointId}`, { method: 'POST', body: fd });
    },
    async deletePoint({ pointId }) {
        return await fetch(`${apiBase}/points/${pointId}`, { method: 'DELETE' });
    }
});

export default points;