import { client } from '$lib/graphql-client';
import { gql } from 'graphql-request';

export const get = async () => {
	try {
		const query = gql`
            query Category{
                categories {
                    name,
                    type,
                    question{
                        name,
                        value
                    }
                }
            }
		`;

		const { categories } = await client.request(query);

		return {
			status: 200,
			body: { categories }
		};
	} catch (error) {
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		};
	}
};
