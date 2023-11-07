import { Anchor } from '@mantine/core'
import { type DataFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
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

export default function DashboardIndex() {
	const user = useLoaderData<typeof loader>()
	console.log('data = ', user)
	return (
		<>
			<div className="flex">
				<div className="mx-auto">
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						Dashboards
					</h1>
					<ul className="list-disc">
						<li className="">
							<Link to={'pitch'}>
								<Anchor size="lg">Pitch Dashboard</Anchor>
							</Link>
						</li>
						<li className="">
							<Link to={'salesops'}>
								<Anchor size="lg">Sales Ops Dashboard</Anchor>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	)
}
