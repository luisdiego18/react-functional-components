import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Medals from "./Medals";

const Country = props => {
	const { country, medals, onIncrement, onDecrement, onDelete } = props;

	const totalMedalsPerCountry = (medals, country) => {
		return medals.reduce((acc, cur) => acc + country[cur.name], 0);
	};

	return (
		<React.Fragment>
			<Card variant="outlined">
				<CardContent>
					<Typography gutterBottom variant="h4" color="error" align="center">
						{country.name}: {totalMedalsPerCountry(medals, country)}
					</Typography>
					{medals.map(medal => (
						<Medals
							key={medal.id}
							medal={medal}
							country={country}
							onIncrement={onIncrement}
							onDecrement={onDecrement}
						></Medals>
					))}
				</CardContent>
				<Button variant="contained" onClick={() => onDelete(country.id)}>Delete</Button>
			</Card>
		</React.Fragment>
	);
};

export default Country;
