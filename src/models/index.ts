import { types, onSnapshot } from "mobx-state-tree";
import CheckboxItem from "./CheckboxItem";

const RootStore = types.model({
	checkboxTree: types.map(CheckboxItem),
});

const store = RootStore.create({
	checkboxTree: {
		"1": {
			label: "root",
			children: [
				{
					label: "root-1-1",
					checked: false,
				},
				{
					label: "root-1-2",
					checked: false,
					children: [
						{
							label: "root-1-2-1",
							checked: false,
						},
					],
				},
			],
			checked: false,
		},
	},
});

onSnapshot(store, (self) => {
	console.log(self);
});

export default store;
