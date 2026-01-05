import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../global.scss'

function Translate() {
	const { i18n } = useTranslation()
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
	const [isExpanded, setIsExpanded] = useState(false)

	const handleLanguageSelect = language => {
		i18n.changeLanguage(language)
		setSelectedLanguage(language)
		setIsExpanded(false)
	}

	const toggleExpand = () => setIsExpanded(!isExpanded)

	return (
		<div className='translate'>
			<div
				className={`language-toggle ${isExpanded ? 'expanded' : ''}`}
				onClick={toggleExpand}
			>
				{!isExpanded && (
					<div className={`language-button ${selectedLanguage}`}>
						<span className='button-text'>
							{selectedLanguage.toUpperCase()}
						</span>
					</div>
				)}
			</div>
			{isExpanded && (
				<div className='language-buttons'>
					<div
						className='language-option'
						onClick={() => handleLanguageSelect('ru')}
					>
						<div className='language-button ru'>
							<span className='button-text'>Ru</span>
						</div>
					</div>
					<div
						className='language-option'
						onClick={() => handleLanguageSelect('uz')}
					>
						<div className='language-button uz'>
							<span className='button-text'>Uz</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Translate
