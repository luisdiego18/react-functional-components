import React from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

const Medals = props => {
	const { country, medal, onIncrement, onDecrement } = props;

	return (
		<React.Fragment>
			<List>
				<ListItem>
					<Avatar sx={{ mr: 2 }}>{country[medal.name]}</Avatar>
					<ListItemText>{medal.name}</ListItemText>
					<ListItemButton>
						<IconButton
							onClick={() => onIncrement(country.id, medal.name)}
							variant="contained"
							size="medium"
							color="primary"
							aria-label="add"
						>
							<AddCircleOutlineIcon fontSize="large" />
						</IconButton>
						<IconButton
							onClick={() => onDecrement(country.id, medal.name)}
							variant="contained"
							size="medium"
							color="primary"
							aria-label="remove"
							disabled={!country[medal.name]}
						>
							<RemoveCircleOutlineIcon fontSize="large" />
						</IconButton>
					</ListItemButton>
				</ListItem>
			</List>
		</React.Fragment>
	);
};

export default Medals;
