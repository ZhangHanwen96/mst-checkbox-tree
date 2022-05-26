import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { autorun, observable, Reaction, runInAction } from "mobx";

const useObservable = (initialValue: any) => {
	return useState(observable(initialValue))[0];
};

const counter = observable({
	count: 0,
});

autorun(() => {
	console.log(counter.count);
});

const observer = (baseComponent: React.FC) => {
	return function () {
		const [_, setTick] = useState(0);

		const tick = useCallback(() => {
			setTick((pre) => pre + 1);
		}, []);

		const reaction = useMemo(() => new Reaction("forceUpdate", tick), []);

		useEffect(() => {
			return () => {
				reaction.dispose();
			};
		}, []);

		let rendering;
		let exception;

		reaction.track(() => {
			try {
				rendering = baseComponent({});
			} catch (error) {
				exception = error;
			}
		});

		if (exception) {
			throw exception; // re-throw any exceptions caught during rendering
		}

		return rendering as any;
	};
};

const Example = observer(() => {
	return (
		<div>
			count: {counter.count}
			<button
				onClick={() =>
					runInAction(() => {
						counter.count++;
					})
				}
			>
				Inc
			</button>
		</div>
	);
});

export default Example;
