import React from 'react';

import {render} from 'react-dom';

import LuggageComponent from './LuggageComponent';
import TileComponent from './TileComponent';
import TileFloorComponent from './TileFloorComponent';

render(
	<LuggageComponent>
		<TileComponent x="0" y="0" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="1" y="0" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="2" y="0" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="3" y="0" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="0" y="1" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="0" y="2" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="0" y="3" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="0" y="0" z="1"><TileFloorComponent /></TileComponent>
		<TileComponent x="0" y="0" z="2"><TileFloorComponent /></TileComponent>
		<TileComponent x="0" y="0" z="3"><TileFloorComponent /></TileComponent>
		<TileComponent x="-1" y="0" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="-2" y="0" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="-3" y="0" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="0" y="-1" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="0" y="-2" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="0" y="-3" z="0"><TileFloorComponent /></TileComponent>
		<TileComponent x="0" y="0" z="-1"><TileFloorComponent /></TileComponent>
		<TileComponent x="0" y="0" z="-2"><TileFloorComponent /></TileComponent>
		<TileComponent x="0" y="0" z="-3"><TileFloorComponent /></TileComponent>
	</LuggageComponent>,
	document.getElementById('root')
);
