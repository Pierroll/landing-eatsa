declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"certifications": {
"fair-trade.md": {
	id: "fair-trade.md";
  slug: "fair-trade";
  body: string;
  collection: "certifications";
  data: InferEntrySchema<"certifications">
} & { render(): Render[".md"] };
"haccp.md": {
	id: "haccp.md";
  slug: "haccp";
  body: string;
  collection: "certifications";
  data: InferEntrySchema<"certifications">
} & { render(): Render[".md"] };
"iso-22000.md": {
	id: "iso-22000.md";
  slug: "iso-22000";
  body: string;
  collection: "certifications";
  data: InferEntrySchema<"certifications">
} & { render(): Render[".md"] };
"senasa.md": {
	id: "senasa.md";
  slug: "senasa";
  body: string;
  collection: "certifications";
  data: InferEntrySchema<"certifications">
} & { render(): Render[".md"] };
"usda-organic.md": {
	id: "usda-organic.md";
  slug: "usda-organic";
  body: string;
  collection: "certifications";
  data: InferEntrySchema<"certifications">
} & { render(): Render[".md"] };
};
"faq": {
"q1-minimum-order.md": {
	id: "q1-minimum-order.md";
  slug: "q1-minimum-order";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"q2-certifications.md": {
	id: "q2-certifications.md";
  slug: "q2-certifications";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"q3-shipping.md": {
	id: "q3-shipping.md";
  slug: "q3-shipping";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"q4-samples.md": {
	id: "q4-samples.md";
  slug: "q4-samples";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"q5-payment.md": {
	id: "q5-payment.md";
  slug: "q5-payment";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
};
"process": {
"calidad.md": {
	id: "calidad.md";
  slug: "calidad";
  body: string;
  collection: "process";
  data: InferEntrySchema<"process">
} & { render(): Render[".md"] };
"cosecha.md": {
	id: "cosecha.md";
  slug: "cosecha";
  body: string;
  collection: "process";
  data: InferEntrySchema<"process">
} & { render(): Render[".md"] };
"exportacion.md": {
	id: "exportacion.md";
  slug: "exportacion";
  body: string;
  collection: "process";
  data: InferEntrySchema<"process">
} & { render(): Render[".md"] };
"procesamiento.md": {
	id: "procesamiento.md";
  slug: "procesamiento";
  body: string;
  collection: "process";
  data: InferEntrySchema<"process">
} & { render(): Render[".md"] };
};
"products": {
"cacao-fino-aroma.md": {
	id: "cacao-fino-aroma.md";
  slug: "cacao-fino-aroma";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"cafe-altura.md": {
	id: "cafe-altura.md";
  slug: "cafe-altura";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"chocolate-cacao.md": {
	id: "chocolate-cacao.md";
  slug: "chocolate-cacao";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"frutas-tropicales.md": {
	id: "frutas-tropicales.md";
  slug: "frutas-tropicales";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"jengibre-fresco.md": {
	id: "jengibre-fresco.md";
  slug: "jengibre-fresco";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"nibs-cacao.md": {
	id: "nibs-cacao.md";
  slug: "nibs-cacao";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
};
"services": {
"customized.md": {
	id: "customized.md";
  slug: "customized";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"logistics.md": {
	id: "logistics.md";
  slug: "logistics";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"quality-control.md": {
	id: "quality-control.md";
  slug: "quality-control";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
};
"testimonials": {
"michael-johnson.md": {
	id: "michael-johnson.md";
  slug: "michael-johnson";
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
