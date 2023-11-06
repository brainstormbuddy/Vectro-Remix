import { Table, Title, rem } from '@mantine/core'
import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { IconCheck } from '@tabler/icons-react'
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
						Praveen's Dashboard
					</h1>
					<div className="flex basis-10 flex-col space-y-5">
						<CompanyPositioningAcrossCalls />
						<FeaturesPitchedAcrossCalls />
						{/* <MomentsOfGreatness /> */}
					</div>
				</div>
			</div>
		</>
	)
}

const check = (
	<IconCheck
		style={{ width: rem(40), height: rem(40) }}
		stroke={1.5}
		color="var(--mantine-color-blue-filled)"
	/>
)

const elements = [
	{
		key_points: 'Streamlines Agency Bill to Direct Bill Efficiency',
		kailyn_insurance_one: check,
		chris_mcdonald: check,
		chris_guidelight: check,
		frequency: 3,
	},
	{
		key_points: 'Reduction in Administrative Costs',
		kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 2,
	},
	{
		key_points: 'Improves Speed & Efficiency',
		kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 2,
	},
	{
		key_points: 'Increases Transparency',
		kailyn_insurance_one: check,
		// chris_mcdonald: check,
		chris_guidelight: check,
		frequency: 2,
	},
	{
		key_points: 'Enhances Customer Experience',
		kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 2,
	},
	{
		key_points: 'Increases Operational Capacity',
		// kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 1,
	},
	{
		key_points: 'Improves EBITDA through Automation',
		// kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 1,
	},
	{
		key_points: 'Revenue Generation through Fees & Commissions',
		// kailyn_insurance_one: check,
		// chris_mcdonald: check,
		chris_guidelight: check,
		frequency: 1,
	},
	{
		key_points: 'Reduction in Non-Pay Cancellations',
		// kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 1,
	},
	{
		key_points: 'Focus on Growth & Strategic Initiatives',
		// kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 1,
	},
	{
		key_points: 'Adds Agency Fees to Bills',
		// kailyn_insurance_one: check,
		// chris_mcdonald: check,
		chris_guidelight: check,
		frequency: 1,
	},
	{
		key_points: 'Reduces Notice of Cancellations',
		// kailyn_insurance_one: check,
		// chris_mcdonald: check,
		chris_guidelight: check,
		frequency: 1,
	},
]

function CompanyPositioningAcrossCalls() {
	const rows = elements.map(element => (
		<Table.Tr key={element.key_points}>
			<Table.Td>{element.key_points}</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{element.kailyn_insurance_one}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{element.chris_mcdonald}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{element.chris_guidelight}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{element.frequency}</div>
				</div>
			</Table.Td>
		</Table.Tr>
	))

	return (
		<>
			<Title order={3}>Company Positioning Across Calls</Title>
			<Table.ScrollContainer minWidth={500}>
				<Table verticalSpacing="sm">
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Key Points</Table.Th>
							<Table.Th>Kailyn - Insurance One</Table.Th>
							<Table.Th>Christopher - Mcdonald Insurance</Table.Th>
							<Table.Th>Christopher - Guidelight</Table.Th>
							<Table.Th>Frequency</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</>
	)
}

const featuresElements = [
	{
		feature: 'streamlined_accounts_processes',
		chris_s: true,
		kaylin: true,
		chris_p: true,
		chris_s_mcdonald: true,
	},
	{
		feature: 'commission_netting_and_market_payments',
		chris_s: true,
		kaylin: true,
		chris_p: true,
		chris_s_mcdonald: true,
	},
	{
		feature: 'custom_checkout_links_for_insureds',
		chris_s: true,
		kaylin: false,
		chris_p: true,
		chris_s_mcdonald: true,
	},
	{
		feature: 'ability_to_pay_in_full_or_enroll_in_financing',
		chris_s: true,
		kaylin: true,
		chris_p: false,
		chris_s_mcdonald: true,
	},
	{
		feature: 'branded_email_communications',
		chris_s: true,
		kaylin: false,
		chris_p: false,
		chris_s_mcdonald: true,
	},
	{
		feature: 'visibility_&_tracking_of_payments/receivables',
		chris_s: true,
		kaylin: false,
		chris_p: false,
		chris_s_mcdonald: true,
	},
	{
		feature: 'integration_with_nowcerts/ams',
		chris_s: true,
		kaylin: false,
		chris_p: true,
		chris_s_mcdonald: true,
	},
	{
		feature: 'automated_payment_reminders',
		chris_s: false,
		kaylin: true,
		chris_p: true,
		chris_s_mcdonald: true,
	},
	{
		feature: 'account_manager_dashboard',
		chris_s: false,
		kaylin: true,
		chris_p: true,
		chris_s_mcdonald: true,
	},
	{
		feature: 'policy_information_management',
		chris_s: true,
		kaylin: false,
		chris_p: true,
		chris_s_mcdonald: true,
	},
	{
		feature: 'financing_agreement_management',
		chris_s: true,
		kaylin: true,
		chris_p: false,
		chris_s_mcdonald: false,
	},
	{
		feature: 'addition_of_fees_and_charges',
		chris_s: true,
		kaylin: false,
		chris_p: false,
		chris_s_mcdonald: false,
	},
	{
		feature: 'uploading_documents_&_selecting_coverage',
		chris_s: true,
		kaylin: false,
		chris_p: false,
		chris_s_mcdonald: true,
	},
	{
		feature: 'e-signature_collection',
		chris_s: true,
		kaylin: false,
		chris_p: false,
		chris_s_mcdonald: true,
	},
	{
		feature: 'self-service_customer_portal',
		chris_s: false,
		kaylin: true,
		chris_p: false,
		chris_s_mcdonald: true,
	},
	{
		feature: 'integration_with_plaid',
		chris_s: false,
		kaylin: false,
		chris_p: true,
		chris_s_mcdonald: true,
	},
	{
		feature: 'cash_flow_management',
		chris_s: false,
		kaylin: false,
		chris_p: true,
		chris_s_mcdonald: true,
	},
]

function get_icon(enabled: boolean) {
	if (enabled) {
		return check
	}
	return null
}

function FeaturesPitchedAcrossCalls() {
	const rows = featuresElements.map(element => (
		<Table.Tr key={element.feature}>
			<Table.Td>{element.feature}</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{get_icon(element.chris_s)}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{get_icon(element.kaylin)}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{get_icon(element.chris_p)}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{get_icon(element.chris_s_mcdonald)}</div>
				</div>
			</Table.Td>
		</Table.Tr>
	))

	return (
		<>
			<Title order={3}>Features Pitched Across Calls</Title>
			<Table.ScrollContainer minWidth={500}>
				<Table verticalSpacing="sm">
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Feature</Table.Th>
							<Table.Th>Chris S</Table.Th>
							<Table.Th>Kaylin</Table.Th>
							<Table.Th>Chris P</Table.Th>
							<Table.Th>Chris S McDonald</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</>
	)
}
