import {
	JavascriptOriginal,
	TypescriptOriginal,
	PythonOriginal,
	JavaOriginal,
	RubyOriginal,
	PhpOriginal,
	GoOriginal,
	RPlain,
	SwiftOriginal,
	KotlinOriginal,
	COriginal,
	CplusplusOriginal,
	CsharpOriginal,
	Html5Original,
	Css3Original,
	VuejsOriginal,
} from "devicons-react";

interface LanguageIconProps {
	language: string;
}

export default function LanguageIcon({ language }: LanguageIconProps) {
	const iconSize = "16";

	const getLanguageIcon = () => {
		switch (language) {
			case "JavaScript":
				return <JavascriptOriginal size={iconSize} />;
			case "TypeScript":
				return <TypescriptOriginal size={iconSize} />;
			case "Python":
				return <PythonOriginal size={iconSize} />;
			case "Java":
				return <JavaOriginal size={iconSize} />;
			case "Ruby":
				return <RubyOriginal size={iconSize} />;
			case "PHP":
				return <PhpOriginal size={iconSize} />;
			case "Go":
				return <GoOriginal size={iconSize} />;
			case "Rust":
				return <RPlain size={iconSize} />;
			case "Swift":
				return <SwiftOriginal size={iconSize} />;
			case "Kotlin":
				return <KotlinOriginal size={iconSize} />;
			case "C":
				return <COriginal size={iconSize} />;
			case "C++":
				return <CplusplusOriginal size={iconSize} />;
			case "C#":
				return <CsharpOriginal size={iconSize} />;
			case "HTML":
				return <Html5Original size={iconSize} />;
			case "CSS":
				return <Css3Original size={iconSize} />;
			case "Vue":
				return <VuejsOriginal size={iconSize} />;
			default:
				return null;
		}
	};

	const icon = getLanguageIcon();

	if (!icon) {
		const languageColors: { [key: string]: string } = {
			Shell: "#89e051",
			Dart: "#0175C2",
			R: "#198CE7",
			Scala: "#c22d40",
			Elixir: "#6e4a7e",
			Haskell: "#5e5086",
			Lua: "#000080",
			Perl: "#0298c3",
			"Objective-C": "#438eff",
		};

		const color = languageColors[language] || "#8b949e";

		return (
			<div className='flex items-center gap-1.5'>
				<div
					className='w-3 h-3 rounded-full inline-block'
					style={{ backgroundColor: color }}
				/>
				<span>{language}</span>
			</div>
		);
	}

	return (
		<div className='flex items-center gap-1.5'>
			{icon}
			<span>{language}</span>
		</div>
	);
}
