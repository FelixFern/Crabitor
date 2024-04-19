import {
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Breadcrumb as MainBreadcrum,
} from "@/components/ui/breadcrumb";
import { splitFilePath } from "@/util/format";

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
							return <BreadcrumbPage>{val}</BreadcrumbPage>;
						}

						return (
							<>
								<BreadcrumbList>{val}</BreadcrumbList>
								<BreadcrumbSeparator />
							</>
						);
					})}
			</BreadcrumbList>
		</MainBreadcrum>
	);
};

export default Breadcrumb;
