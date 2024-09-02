const CalculateFare = (distance, duration, priceDetails) => {
    const {
        cost_per_minute,
        cost_per_distance,
        minimum,
        base
    } = priceDetails;

    const distanceCost = cost_per_distance * distance;
    const timeCost = cost_per_minute * duration;
    const totalFare = base + distanceCost + timeCost;

    return Math.max(totalFare, minimum); // Ensure minimum fare is met
}

export default CalculateFare