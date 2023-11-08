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
					<div className="mt-10 flex flex-col space-y-10">
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
		name: 'Kailyn D',
	},
	{
		link: 'https://grain.com/share/highlight/PTA3OhIKQQnlavmVA7enoVhUg6GXYEIHaCjUueGB',
		description: 'Offer 2:1 demo',
		name: 'Kailyn D',
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
		<div className="w-min">
			<Title order={3}>Moments of Greatness</Title>
			<Table.ScrollContainer minWidth={800}>
				<Table horizontalSpacing={25}>
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
		</div>
	)
}

const reviewElements = [
	{
		link: 'https://grain.com/share/highlight/CKK3D2VslMfwysV5cY71HjxhC2lIoSCdVID3HKFE',
		description: 'Update slide to latest version',
		name: 'Kailyn D',
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
		<div className="w-min">
			<Title order={3}>Review Moments</Title>
			<Table.ScrollContainer minWidth={800}>
				<Table horizontalSpacing={25}>
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
		</div>
	)
}

const scoringElements = [
	{
		name: 'Christopher S',
		intro: 7,
		callControl: 9,
		qualificationRecap: 7,
		discovery: 9,
		championBuilding: 9,
		businessCaseBuilding: 8,
		objectionHandling: 6,
		closingAbilities: 9,
	},
	{
		name: 'Kailyn D',
		intro: 9,
		callControl: 9,
		qualificationRecap: 3,
		discovery: 9,
		championBuilding: 8,
		businessCaseBuilding: 5,
		objectionHandling: 8,
		closingAbilities: 8,
	},
	{
		name: 'Christopher S',
		intro: 6,
		callControl: 9,
		qualificationRecap: 9,
		discovery: 9,
		championBuilding: 9,
		businessCaseBuilding: 'NA',
		objectionHandling: 7,
		closingAbilities: 10,
	},
	{
		name: 'Chris P',
		intro: 5,
		callControl: 7,
		qualificationRecap: 6,
		discovery: 7,
		championBuilding: 7,
		businessCaseBuilding: 4,
		objectionHandling: 5,
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
			<Table.Td className="text-center">{element.intro}</Table.Td>
			<Table.Td className="text-center">{element.callControl}</Table.Td>
			<Table.Td className="text-center">{element.qualificationRecap}</Table.Td>
			<Table.Td className="text-center">{element.discovery}</Table.Td>
			<Table.Td className="text-center">{element.championBuilding}</Table.Td>
			<Table.Td className="text-center">
				{element.businessCaseBuilding}
			</Table.Td>
			<Table.Td className="text-center">{element.objectionHandling}</Table.Td>
			<Table.Td className="text-center">{element.closingAbilities}</Table.Td>
		</Table.Tr>
	))

	return (
		<>
			<Title order={3}>Call Scoring Per Rubrik</Title>
			<Table.ScrollContainer minWidth={10}>
				<Table verticalSpacing="sm" layout="fixed" className="!w-fit">
					<Table.Thead>
						<Table.Tr>
							<TableHeader name={'Name'} />
							<TableHeader name={'Intro'} />
							<TableHeader name={'Call Control'} />
							<TableHeader name={'Qualification Recap'} />
							<TableHeader name={'Discovery'} />
							<TableHeader name={'Champion Building'} />
							<TableHeader name={'Business Case Building'} />
							<TableHeader name={'Objection Handling'} />
							<TableHeader name={'Closing Abilities'} />
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</>
	)
}

interface TableHeaderProps {
	name: string
}

function TableHeader({ name }: TableHeaderProps) {
	return (
		<Table.Th>
			<div className="text-center">{name}</div>
		</Table.Th>
	)
}
