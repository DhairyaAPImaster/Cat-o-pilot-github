import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Zap } from 'lucide-react';

const versions = [
	{
		version: '1.0.1',
		title: 'OG Cat Brain',
		badge: 'starter',
		tone: 'from-orange-500/20 via-amber-400/10 to-transparent',
		downloadPath: '/assets/catcode-explainer-1.0.1.vsix'
	},
	{
		version: '1.0.2',
		title: 'Hackclub Boost',
		badge: 'popular',
		tone: 'from-cyan-500/20 via-sky-400/10 to-transparent',
		downloadPath: '/assets/catcode-explainer-1.0.2.vsix'
	},
	{
		version: '1.0.3',
		title: 'Power Cat',
		badge: 'most powerful',
		tone: 'from-fuchsia-500/20 via-pink-400/10 to-transparent',
		downloadPath: '/assets/catcode-explainer-1.0.3.vsix'
	}
];

const comparisonRows = [
	{
		label: 'Model access',
		values: ['Gemini only', 'Hack Club Gemini', 'Hack Club Gemini + tuned prompts'],
		type: 'text'
	},
	{
		label: 'User API key required',
		values: [true, false, false],
		type: 'bool'
	},
	{
		label: 'Streaming responses',
		values: [false, true, true],
		type: 'bool'
	},
	{
		label: 'Context depth',
		values: ['basic', 'solid', 'deep'],
		type: 'text'
	},
	{
		label: 'Latency profile',
		values: ['steady', 'fast', 'fastest'],
		type: 'text'
	},
	{
		label: 'Best for',
		values: ['tinkerers', 'hackathon teams', 'production workflows'],
		type: 'text'
	}
];

const setupSteps = [
	'Step1 - Download the extension',
	'Step2 - Open VS code',
	'Step3 - Go to the extensions tab',
	'Step4 - Press the top right three buttons',
	'Step5 - Click install from Vsix',
	'Step6 - INSTALLED !!!!',
	'Step7 - Follow the instructions that popup and select the ai model',
	'Step8 - your extension is ready'
];

function BoolCell({ value }) {
	return value ? (
		<span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500">
			<Check className="h-4 w-4" />
			yes
		</span>
	) : (
		<span className="inline-flex items-center gap-2 text-sm font-semibold text-rose-500">
			<X className="h-4 w-4" />
			no
		</span>
	);
}

export function Comparison() {
	const [showSetup, setShowSetup] = useState(false);

	return (
		<section className="relative min-h-screen overflow-hidden pt-28 pb-24 theme-section">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_60%)] opacity-20" />
			<div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-6xl px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center space-y-6"
				>
					<div className="inline-flex items-center gap-2 bg-muted/70 border border-border px-4 py-2 rounded-full text-sm">
						<Zap className="w-4 h-4 text-primary" />
						full comparison grid
					</div>
					<h1 className="text-5xl md:text-7xl font-bold">
						Compare Cat-o-Pilot
						<span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
							see the real differences
						</span>
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						side-by-side stats so you can pick fast. each version keeps the cat energy, but the power stack changes.
					</p>
				</motion.div>

				<div className="mt-14 grid gap-6 lg:grid-cols-3">
					{versions.map((version, index) => (
						<motion.div
							key={version.version}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="relative overflow-hidden rounded-3xl border border-border bg-background/70 backdrop-blur theme-card"
						>
							<div className={`absolute inset-0 bg-gradient-to-br ${version.tone}`} />
							<div className="relative p-8 space-y-5">
								<span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-foreground text-background px-3 py-1 rounded-full">
									{version.badge}
								</span>
								<div>
									<p className="text-sm text-muted-foreground">Version</p>
									<h3 className="text-3xl font-bold">{version.version}</h3>
								</div>
								<p className="text-lg font-semibold">{version.title}</p>
								<a
									href={version.downloadPath}
									download
									onClick={() => setShowSetup(true)}
									className="inline-flex items-center justify-center w-full gap-2 bg-foreground text-background px-6 py-3 font-semibold hover:opacity-90 transition"
								>
									download {version.version}
								</a>
							</div>
						</motion.div>
					))}
				</div>

				<div className="mt-16 overflow-hidden rounded-3xl border border-border bg-background/80 backdrop-blur theme-card">
					<div className="grid gap-0 border-b border-border bg-muted/40 md:grid-cols-4">
						<div className="p-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">feature</div>
						{versions.map((version) => (
							<div key={version.version} className="p-6 text-base font-semibold">
								{version.title}
							</div>
						))}
					</div>
					{comparisonRows.map((row) => (
						<div key={row.label} className="grid gap-0 border-b border-border md:grid-cols-4">
							<div className="p-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
								{row.label}
							</div>
							{row.values.map((value, index) => (
								<div key={`${row.label}-${index}`} className="p-6">
									{row.type === 'bool' ? <BoolCell value={value} /> : <span className="text-base font-medium">{value}</span>}
								</div>
							))}
						</div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="mt-14 flex flex-col items-center gap-4"
				>
					<Link
						to="/download"
						className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 text-lg font-semibold hover:opacity-90 transition shadow-xl"
					>
						go to downloads
					</Link>
					<p className="text-sm text-muted-foreground">download the VSIX, then install from VS Code: Extensions view - Install from VSIX.</p>
				</motion.div>
			</div>

			{showSetup ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10">
					<button
						type="button"
						aria-label="Close setup steps"
						className="absolute inset-0 bg-background/70 backdrop-blur"
						onClick={() => setShowSetup(false)}
					/>
					<div className="relative w-full max-w-2xl rounded-3xl border border-border bg-background shadow-2xl theme-card">
						<div className="flex items-start justify-between gap-6 border-b border-border px-8 py-6">
							<div>
								<p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">setup guide</p>
								<h2 className="text-3xl font-bold">Next steps after install</h2>
							</div>
							<button
								type="button"
								className="rounded-full border border-border px-3 py-1 text-sm font-semibold hover:bg-muted"
								onClick={() => setShowSetup(false)}
							>
								close
							</button>
						</div>
						<div className="px-8 py-6">
							<ol className="space-y-3 text-base text-muted-foreground">
								{setupSteps.map((step) => (
									<li key={step} className="rounded-2xl border border-border/60 bg-muted/40 px-4 py-3 font-semibold text-foreground">
										{step}
									</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			) : null}
		</section>
	);
}

