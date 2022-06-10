/* eslint-disable indent */
/* eslint-disable @typescript-eslint/naming-convention */
import { useLayoutEffect, useMemo, useState } from 'react'

export function useCheck<L>(initList: L[] | undefined): {
	list: L[],
	check: (index: number) => void,
	checkAll: (bool: boolean) => void,
	total_checked: L[],
} {
	const [list, setList] = useState<L[]>([])
	const total_checked = useMemo(() => list.filter((el: any) => el.checked), [list])
	useLayoutEffect(() => {
		initList && setList(initList)
	}, [initList])

	const check_item = (index: number) => {
		const $list = JSON.parse(JSON.stringify(list))
		if ($list[index].checked) {
			$list[index].checked = false
		} else {
			$list[index].checked = true
		}
		setList($list)
	}
	const checkAll = (bool: boolean) => {
		const $list = JSON.parse(JSON.stringify(list))
		$list.forEach((element: any) => {
			element.checked = bool
		})
		setList($list)
	}

	return {
		list,
		check: check_item,
		checkAll,
		total_checked,
	}
}
