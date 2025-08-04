import { Button } from '@/components/ui/button';

export default function ProviderButtons() {
	return (
		<div className="grid grid-cols-2 gap-4">
			<Button variant="outline" className="w-full flex items-center justify-center gap-2 bg-transparent">
				<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
					<title>Google</title>
					<path
						d="M12.24 10.285V11.69h4.733c-.213 1.253-.92 2.32-1.99 3.013l3.96 3.07c2.31-2.14 3.65-5.25 3.65-9.01 0-.72-.06-1.4-.18-2.05H12.24v-.002z"
						fill="#4285F4"
					/>
					<path
						d="M12.24 13.715c-2.42 0-4.44-1.62-5.17-3.81l-4.05 3.14c1.3 2.54 3.98 4.25 7.22 4.25 4.24 0 7.8-2.9 9.08-6.95l-3.96-3.07c-.73 2.19-2.75 3.81-5.17 3.81z"
						fill="#34A853"
					/>
					<path
						d="M7.07 10.285c-.18-.54-.28-.99-.28-1.51 0-.52.1-.97.28-1.51L3.02 4.12C1.1 6.04 0 8.44 0 10.99c0 2.55 1.1 4.95 3.02 6.87l4.05-3.14z"
						fill="#FBBC05"
					/>
					<path
						d="M12.24 6.715c1.32 0 2.5.45 3.43 1.34l3.56-3.56C18.04 2.92 15.34 1.5 12.24 1.5c-3.24 0-5.92 1.71-7.22 4.25l4.05 3.14c.73-2.19 2.75-3.81 5.17-3.81z"
						fill="#EA4335"
					/>
				</svg>
				Gmail
			</Button>
			<Button variant="outline" className="w-full flex items-center justify-center gap-2 bg-transparent">
				<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
					<title>Microsoft Outlook</title>
					<path
						d="M0 3.225v17.55h24V3.225H0zm1.714 1.714h20.572v13.886H1.714V4.939zm1.714 1.714v10.458h17.144V6.653H3.428zM5.142 8.367v7.029h13.716V8.367H5.142z"
						fill="#0078D4"
					/>
					<path
						d="M12 12.001l-6.858 3.67v-7.34L12 12.001zM12 12.001l6.858 3.67v-7.34L12 12.001z"
						fill="#0078D4"
					/>
				</svg>
				Outlook
			</Button>
		</div>
	);
}
