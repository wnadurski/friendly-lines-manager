import React from "react"
import {View, Text} from "native-base"
import {withLink} from "../../libs/withState"
import { Col, Row, Grid } from 'react-native-easy-grid';

const sectionPageStyle = {
	sections: {
		backgroundColor: "#5e92f3",
		justifyContent: "center"
	},

	sectionListItem: {
		padding: 25,
		marginVertical: 10
	},

	activeSectionListItem: {
		backgroundColor: "#fff",
		color: "black"
	},

	section: {
		flex: 1,
		justifyContent:"center",
		flexDirection: "column",
		paddingVertical: 60,
		paddingHorizontal: 120
	}
}

const Section = ({children}) => (
	<View style={sectionPageStyle.section}>
		{children}
	</View>
)

const _SectionPage =
		({sections, renderField, config, activeSectionIdx, activeSectionIdxChange}) =>
			<Grid style={sectionPageStyle.container}>
				<Col style={sectionPageStyle.sections} size={30}>
					{sections.map((section, idx) => {
						const isActive = activeSectionIdx === idx
						return <View style={[sectionPageStyle.sectionListItem, isActive && sectionPageStyle.activeSectionListItem]} key={section.name}>
							<Text style={{fontSize: 28, color: isActive ? "black" : "white"}} onPress={() => activeSectionIdxChange(idx)}>{section.name}</Text>
						</View>
						})
					}
				</Col>
				<Col style={{justifyContent: "center"}} size={70}>
					<Section>
						{sections[activeSectionIdx].fields.map(renderField)}
					</Section>
				</Col>
			</Grid>


export const SectionPage = withLink("activeSectionIdx", 0)(_SectionPage);