const calculateRevenue = (users) => {
    const rates = {
        basic: { daily: 50, weekly: 180, monthly: 300 },
        premium: { daily: 100, weekly: 400, monthly: 600 },
    };

    const total = {};
    for (const plan in users) {
        const usage = users[plan];
        const rate = rates[plan];
        total[plan] =
            usage.daily * rate.daily +
            usage.weekly * rate.weekly +
            usage.monthly * rate.monthly;
    }
    return total;
};

export default calculateRevenue;