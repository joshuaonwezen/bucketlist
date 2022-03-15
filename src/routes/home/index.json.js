import { client } from '$lib/graphql-client';
import { gql } from 'graphql-request';

export const get = async () => {
	try {
		const query = gql`
			query Home {
				categories {
					name
					type
					question {
						name
						value
					}
				}
				miscs {
					rules
					detailsImage {
						url
					}
					resultsImage {
						url
					}
				}
			}
		`;

		const { categories, miscs } = await client.request(query);

		return {
			status: 200,
			body: { categories, miscs }
		};
	} catch (error) {
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		};
	}
};
