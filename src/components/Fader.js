import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Fader = ({ text }) => {
	const [fadeProp, setFadeProp] = useState({
		fade: "fade-in",
	});

	useEffect(() => {
		const timeout = setInterval(() => {
			if (fadeProp.fade === "fade-in") {
				setFadeProp({
					fade: "fade-out",
				});
			} else {
				setFadeProp({
					fade: "fade-in",
				});
			}
		}, 4000);

		return () => clearInterval(timeout);
	}, [fadeProp]);

	return (
		<>
			<span className={fadeProp.fade}>{text}</span>
		</>
	);
};

Fader.defaultProps = {
	text: "",
};

Fader.propTypes = {
	text: PropTypes.string,
};

export default Fader;
