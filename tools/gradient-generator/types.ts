import type { Payload } from '@ckpack/vue-color';

type GradientColor = {
	value: Payload;
	stop: number;
	status: 'in' | 'out' | 'dragged';
};

type GradientOptions = {
	type: 'linear' | 'radial';
	repeating: {
		selections: boolean[];
		selected: boolean;
	};
	angle: number;
	shape: 'ellipse' | 'circle';
	height: number;
	width: number;
	length: number;
	yOffset: number;
	xOffset: number;
	colors: GradientColor[];
	style: {
		'background-image': string;
	};
	status: string;
};

export type { GradientOptions, GradientColor };