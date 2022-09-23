export function calculateFlowRate(amount) {
    let fr = amount / (86400 * 30)
    return Math.floor(fr);
}