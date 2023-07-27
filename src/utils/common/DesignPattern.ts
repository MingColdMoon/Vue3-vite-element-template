/**
 * 策略模式执行
 *
 */
export function StrategyPattern(arr: any[]) {
	arr.some(item => {
		const [flag, func] = item
		if (flag) {
			func()
		}
		return flag
	})
}
