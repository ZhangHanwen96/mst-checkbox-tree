import { types, getParent, getRoot, hasParent } from "mobx-state-tree";

// @ts-ignore
const CheckboxItem = types
	.model({
		label: types.optional(types.string, ""),
		children: types.optional(
			types.array(types.late(() => CheckboxItem)),
			[]
		),
		checked: types.optional(types.boolean, false),
		indeterminate: types.optional(types.boolean, false),
	})
	.actions((self) => {
		function cascadeDown() {
			const currentChecked = self.checked;

			if (self.children && self.children.length !== 0) {
				self.children.forEach((child: any) => {
					child.setChecked(currentChecked);
					child.cascadeDown();
				});
			}
		}

		function setChecked(val: boolean) {
			self.checked = val;
		}

		function setIndetermine(val: boolean) {
			self.indeterminate = val;
		}

		function toggleChecked() {
			self.checked = !self.checked;
			cascadeDown();
			cascadeUp();
		}

		function cascadeUp() {
			if (hasParent(self, 2)) {
				const parent = getParent(self, 2) as any;

				if (getRoot(self) === parent) {
					return;
				}

				const allCheck = parent.children.every(
					(child: any) => child.checked
				);

				const indeterminate =
					parent.children.some((child: any) => child.checked) &&
					!allCheck;

				parent.setChecked(allCheck);
				parent.setIndetermine(indeterminate);

				parent.cascadeUp();
			}
		}

		return {
			cascadeDown,
			cascadeUp,
			setChecked,
			toggleChecked,
			setIndetermine,
		};
	})
	.views((self) => ({
		get hasChildren() {
			return Boolean(self.children && self.children.length);
		},
	}));

export default CheckboxItem;
