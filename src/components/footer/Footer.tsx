"use client";
import { motion } from "framer-motion";
import { BsGithub } from "react-icons/bs";
import { VerticalCommonVariants } from "../../utils/framerVariants";
import {
	TS_LINK,
	VITE_LINK,
	REACT_LINK,
	FRAMER_LINK,
	VERCEL_LINK,
	TAILWIND_LINK,
	ROHIT_PORTFOLIO_V2_GITHUB_LINK,
	FIGMA_LINK,
} from "../../utils/constants";
import { SmotionDiv, SmotionLink } from "@/libs/framer-motion";

const Footer = () => {
	const currentYear = new Date().getFullYear();
	const verticalVariants = VerticalCommonVariants(30);

	return (
		<div className="overflow-hidden">
			{/* wrapper */}
			<div>
				{/* Last */}
				<SmotionDiv
					initial="hidden"
					whileInView="shown"
					variants={verticalVariants}
					className="bg-black text-white flex justify-center flex-col items-center tracking-tight font-semibold text-center
                    px-3 py-3
                    xmmd:text-lg"
				>
					{/* technologies */}
					<SmotionDiv variants={verticalVariants}>
						Built with <br className="hidden xssm:block sm:hidden" />
						<span className="gap-1">
							<SmotionLink
								inLine={true}
								whileHover={{ y: -2 }}
								className="inline hover:underline"
								href={TS_LINK}
								target="_blank"
							>
								TypeScript,
							</SmotionLink>{" "}
							<SmotionLink
								inLine={true}
								whileHover={{ y: -2 }}
								className="inline hover:underline"
								href={REACT_LINK}
								target="_blank"
							>
								React.js,
							</SmotionLink>{" "}
							<br className="xssm:hidden" />
							<SmotionLink
								inLine={true}
								whileHover={{ y: -2 }}
								className="inline hover:underline"
								href={TAILWIND_LINK}
								target="_blank"
							>
								TailwindCSS,
							</SmotionLink>{" "}
							<SmotionLink
								inLine={true}
								whileHover={{ y: -2 }}
								className="inline hover:underline"
								href={FRAMER_LINK}
								target="_blank"
							>
								Framer Motion,
							</SmotionLink>{" "}
							and{" "}
							<SmotionLink
								inLine={true}
								whileHover={{ y: -2 }}
								className="inline hover:underline"
								href={VERCEL_LINK}
								target="_blank"
							>
								Vercel.
							</SmotionLink>
						</span>
					</SmotionDiv>
					{/* Star this project */}
					<motion.div variants={verticalVariants}>
						<SmotionLink href={ROHIT_PORTFOLIO_V2_GITHUB_LINK} target="_blank">
							<div className="flex items-center gap-1">
								Star this project on Github
								<BsGithub />
							</div>
						</SmotionLink>
					</motion.div>

					{/* Copyright */}
					<motion.div
						variants={verticalVariants}
						className="flex items-cent
          "
					>
						&#169; Rohit Lohar {currentYear}
					</motion.div>
				</SmotionDiv>
			</div>
		</div>
	);
};

export default Footer;
