import React, { FC, useState } from "react";
import { useRendersCount } from "react-use";
import { observer } from "mobx-react";
import { Checkbox } from "@mantine/core";
import CheckboxItem from "../../models/CheckboxItem";

interface IProps {
	item: typeof CheckboxItem;
}

const CheckboxView: FC<IProps> = observer(({ item }) => {
	const count = useRendersCount();
	return (
		<li>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<Checkbox
					onChange={(e) => {
						item.toggleChecked();
					}}
					size="sm"
					checked={item.checked}
					indeterminate={item.indeterminate}
				/>
				<span>{item.label}</span>
				<span> ------ {count}</span>
			</div>
			{item.hasChildren && (
				<ul>
					{item.children.map((child: any) => {
						return <CheckboxView item={child} />;
					})}
				</ul>
			)}
		</li>
	);
});

export default CheckboxView;
