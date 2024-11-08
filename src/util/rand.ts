export function randInt(num1: number, num2: number): number {
    const [min, max] = [Math.min(num1, num2), Math.max(num1, num2)];
    return Math.floor(Math.random() * (max - min + 1)) + min;
}