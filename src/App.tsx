import { FC } from "react";
import { observer } from "mobx-react";
import { values } from "mobx";
import store from "./models";
import CheckboxView from "./components/CheckboxView/CheckboxView";
import "./App.css";

interface Props {
	store: typeof store;
}

const App: FC<Props> = observer(({ store }) => {
	return (
		<ul>
			{values(store.checkboxTree).map((item: any) => {
				return <CheckboxView key={item.label} item={item} />;
			})}
		</ul>
	);
});
export default App;
