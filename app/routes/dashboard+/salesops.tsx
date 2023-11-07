import { Table, Avatar, Title, Anchor } from '@mantine/core'
import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import chrisProfile from '#app/assets/chris.jpeg'
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

export default function SalesOpDashboard() {
	const user = useLoaderData<typeof loader>()
	console.log('data = ', user)
	return (
		<>
			<div className="flex">
				<div className="mx-auto">
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						Sales Ops Dashboard
					</h1>
					<div className="flex basis-10 flex-col space-y-10">
						<MomentsOfGreatness />
						<ReviewMoments />
						<Scoring />
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
			<Table.ScrollContainer minWidth={500}>
				<Table verticalSpacing="sm" horizontalSpacing={75}>
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

const reviewElements = [
	{
		link: 'https://grain.com/share/highlight/CKK3D2VslMfwysV5cY71HjxhC2lIoSCdVID3HKFE',
		description: 'Update slide to latest version',
		name: 'Kailyn',
		image: kailynProfile,
	},
	{
		link: 'https://grain.com/share/highlight/PTA3OhIKQQnlavmVA7enoVhUg6GXYEIHaCjUueGB',
		description: 'Consider schedule meeting earlier',
		name: 'Chris P',
		image: chrisProfile,
	},
]

function ReviewMoments() {
	const rows = reviewElements.map(element => (
		<Table.Tr key={element.name}>
			<Table.Td>
				<div className="justify-left flex items-center gap-2">
					<Avatar src={element.image} />
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
			<Title order={3}>Review Moments</Title>
			<Table.ScrollContainer minWidth={500}>
				<Table verticalSpacing="sm" horizontalSpacing={75}>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Name</Table.Th>
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

const scoringElements = [
	{
		name: 'Kailyn',
		intro: 8.5,
		callControl: 8.5,
		qualificationRecap: 8.5,
		discovery: 8.5,
		championBuilding: 8.5,
		businessCaseBuilding: 8.5,
		objectionHandling: 8.5,
		closingAbilities: 9,
	},
	{
		name: 'Christopher',
		intro: 8.5,
		callControl: 8.5,
		qualificationRecap: 8.5,
		discovery: 8.5,
		championBuilding: 8.5,
		businessCaseBuilding: 8.5,
		objectionHandling: 8.5,
		closingAbilities: 8,
	},
	{
		name: 'Christopher',
		intro: 8.5,
		callControl: 8.5,
		qualificationRecap: 8.5,
		discovery: 8.5,
		championBuilding: 8.5,
		businessCaseBuilding: 8.5,
		objectionHandling: 8.5,
		closingAbilities: 9.5,
	},
	{
		name: 'Chris P',
		intro: 8.5,
		callControl: 7.5,
		qualificationRecap: 7.5,
		discovery: 7.5,
		championBuilding: 7.5,
		businessCaseBuilding: 8,
		objectionHandling: 7.5,
		closingAbilities: 9,
	},
]

function Scoring() {
	const rows = scoringElements.map(element => (
		<Table.Tr key={element.name}>
			<Table.Td>
				<div className="justify-left flex items-center gap-2">
					{element.name}
				</div>
			</Table.Td>
			<Table.Td>{element.intro}</Table.Td>
			<Table.Td>{element.callControl}</Table.Td>
			<Table.Td>{element.qualificationRecap}</Table.Td>
			<Table.Td>{element.discovery}</Table.Td>
			<Table.Td>{element.championBuilding}</Table.Td>
			<Table.Td>{element.businessCaseBuilding}</Table.Td>
			<Table.Td>{element.objectionHandling}</Table.Td>
			<Table.Td>{element.closingAbilities}</Table.Td>
		</Table.Tr>
	))

	return (
		<>
			<Title order={3}>Call Scoring Per Rubrik</Title>
			<Table.ScrollContainer minWidth={10}>
				<Table verticalSpacing="sm">
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Name</Table.Th>
							<Table.Th>Intro</Table.Th>
							<Table.Th>Call Control</Table.Th>
							<Table.Th>Qualification Recap</Table.Th>
							<Table.Th>Discovery</Table.Th>
							<Table.Th>Champion Building</Table.Th>
							<Table.Th>Business Case Building</Table.Th>
							<Table.Th>Objection Handling</Table.Th>
							<Table.Th>Closing Abilities</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</>
	)
}
