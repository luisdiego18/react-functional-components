import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const NewCountry = props => {
	const { onAddCountry } = props;

	const saveCountry = () => {
		const country = prompt("Enter country name");
		onAddCountry(country);
	};

	return (
		<div className="new-country">
			<div className="newCountryButton">
				<Fab color="primary" aria-label="add" onClick={saveCountry}>
					<AddIcon />
				</Fab>
			</div>
		</div>
	);
};

export default NewCountry;
