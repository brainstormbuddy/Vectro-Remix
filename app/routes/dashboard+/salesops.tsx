import { Table, Avatar, Title, Anchor } from '@mantine/core'
import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import kailynProfile from '#app/assets/kailyn.jpeg'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ params, request }: DataFunctionArgs) {
	const userId = await requireUserId(request)
	const user = prisma.user.findUniqueOrThrow({
		select: {
			id: true,
			name: true,
			username: true,
			image: { select: { id: true } },
			roles: {
				select: {
					name: true,
					permissions: {
						select: { entity: true, action: true, access: true },
					},
				},
			},
		},
		where: { id: userId },
	})
	return user
}

export default function NoteEdit() {
	const user = useLoaderData<typeof loader>()
	console.log('data = ', user)
	return (
		<>
			<div className="flex">
				<div className="mx-auto">
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						Sales Ops Dashboard
					</h1>
					<div className="flex basis-10 flex-col space-y-5">
						<MomentsOfGreatness />
						{/* <MomentsOfGreatness /> */}
					</div>
				</div>
			</div>
		</>
	)
}

const elements = [
	{
		link: 'https://grain.com/share/highlight/CKK3D2VslMfwysV5cY71HjxhC2lIoSCdVID3HKFE',
		description: 'Ref existing customer',
		name: 'Kailyn',
	},
	{
		link: 'https://grain.com/share/highlight/PTA3OhIKQQnlavmVA7enoVhUg6GXYEIHaCjUueGB',
		description: 'Offer 2:1 demo',
		name: 'Kailyn',
	},
]

function MomentsOfGreatness() {
	const rows = elements.map(element => (
		<Table.Tr key={element.name}>
			<Table.Td>
				<div className="justify-left flex items-center gap-2">
					<Avatar src={kailynProfile} />
					{element.name}
				</div>
			</Table.Td>
			<Table.Td>{element.description}</Table.Td>
			<Table.Td>
				<Anchor href={element.link}>Link</Anchor>
			</Table.Td>
		</Table.Tr>
	))

	return (
		<>
			<Title order={3}>Moments of Greatness</Title>
			<Table.ScrollContainer minWidth={1000}>
				<Table verticalSpacing="sm">
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Rep Name</Table.Th>
							<Table.Th>Description</Table.Th>
							<Table.Th>Link</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</>
	)
}
