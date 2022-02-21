import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Country from "./components/Country";
import NewCountry from "./components/NewCountry";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "./App.css";

const App = () => {
	const [countries, setCountries] = useState([]);
	const apiEndpoint = "https://medalwebapp.azurewebsites.net/Api/country";

	const medals = useRef([
		{ id: 1, name: "gold" },
		{ id: 2, name: "silver" },
		{ id: 3, name: "bronze" },
	]);

	useEffect(() => {
		async function fetchCountries() {
			const { data: fetchedCountries } = await axios.get(apiEndpoint);
			setCountries(fetchedCountries);
		}
		fetchCountries();
	}, []);

	//handle gold medal increment
	const handleIncrement = (countryId, medalName) => {
		const mutableCountries = [...countries];
		const index = countries.findIndex(c => c.id === countryId);
		mutableCountries[index][medalName] += 1;
		setCountries(mutableCountries);
	};

	const handleDecrement = (countryId, medalName) => {
		const mutableCountries = [...countries];
		const index = countries.findIndex(c => c.id === countryId);
		mutableCountries[index][medalName] -= 1;
		setCountries(mutableCountries);
	};

	const handleMedalCount = () => {
		let totalMedals = 0;
		medals.current.forEach(medal => {
			totalMedals += countries.reduce((a, b) => a + b[medal.name], 0);
		});
		return totalMedals;
	};

	//handle add country with axiox
	const handleAddCountry = async name => {
		const { data: post } = await axios.post(apiEndpoint, { name: name });
		setCountries(countries.concat(post));
	};

	//Handle delete country
	const handleDelete = async (countryId) => {
		const currentCountries = countries;
		setCountries(countries.filter(c => c.id !== countryId));
		try {
			await axios.delete(`${apiEndpoint}/${countryId}`);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				// country already deleted
				console.log(
					"The record does not exist - it may have already been deleted"
				);
			} else {
				alert("An error occurred while deleting");
				setCountries(currentCountries);
			}
		}
	};

	return (
		<div className="App">
			<Container>
				<Typography gutterBottom variant="h2" color="primary" align="center">
					{`Olympic Medals: `}
					{handleMedalCount()}
				</Typography>
				<Grid container spacing={3} sx={{ my: 2 }}>
					{countries.map(country => (
						<Grid item xs={12} md={6} lg={4} key={country.id}>
							<Country
								key={country.id}
								country={country}
								medals={medals.current}
								onIncrement={handleIncrement}
								onDecrement={handleDecrement}
								onDelete={handleDelete}
							/>
						</Grid>
					))}
				</Grid>
				<NewCountry onAddCountry={handleAddCountry} />
			</Container>
		</div>
	);
};
export default App;
