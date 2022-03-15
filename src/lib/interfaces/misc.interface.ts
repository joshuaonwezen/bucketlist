import type { Asset } from './asset.interface';

export interface Misc {
	rules: string;
	detailsImage: Record<string, Asset>;
    resultsImage: Record<string, Asset>;
}