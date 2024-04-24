import {
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Breadcrumb as MainBreadcrum,
} from "@/components/ui/breadcrumb";
import { splitFilePath } from "@/util/format";
import React from "react";

const Breadcrumb = ({ filePath }: { filePath: string }) => {
	return (
		<MainBreadcrum>
			<BreadcrumbList>
				{splitFilePath(filePath ?? "")
					.splice(1)
					.map((val, index) => {
						if (
							index ===
							splitFilePath(filePath ?? "").length - 2
						) {
							return (
								<BreadcrumbPage key={val}>{val}</BreadcrumbPage>
							);
						}

						return (
							<React.Fragment key={val}>
								<BreadcrumbList>{val}</BreadcrumbList>
								<BreadcrumbSeparator />
							</React.Fragment>
						);
					})}
			</BreadcrumbList>
		</MainBreadcrum>
	);
};

export default Breadcrumb;
