export type Stat = "ok" | "error";

export type Error = {
  code: number;
  error: string;
  message: string;
};

export type ColorPaletteColor = { name: string };

export type GetColorPaletteInfoResponse = {
  palette: string;
  /**
   * {
   *    "#fc89ac": {
   *	    "name": "Tickle Me Pink"
   *    }
   *}
   */
  colors: Record<string, ColorPaletteColor>;
  stat: Stat;
  event_publishing_state: "ok";
};

export type GetColorPalettesListResponse = {
  /**
   * {
   *"   crayola": "Crayola®",
   *	"css3": "CSS3",
   *	"css4": "CSS4"
   * }
   */
  palettes: Record<string, string>;
  stat: Stat;
  event_publishing_state: "ok";
};

export type ImageItem = {
  url: string;
  width: number;
  height: number;
  is_primary: string;
  image_id: string;
};

export type Image = {
  b: ImageItem;
  z: ImageItem;
  n: ImageItem;
  d: ImageItem;
  sq: ImageItem;
};

export type Participant = {
  person_id: string;
  role_id: string;
  person_name: string;
  person_date: string;
  role_name: string;
  role_display_name: string;
  person_url: string;
  role_url: string;
};

export type Object = {
  id: string;
  "tms:id": string;
  accession_number: string;
  title: string;
  title_raw?: string;
  url: string;
  has_no_known_copyright?: string;
  department_id: string;
  period_id?: string;
  media_id: string;
  type_id: string;
  date: string;
  year_start?: number;
  year_end?: number;
  year_acquired: string;
  decade?: string;
  "woe:country_id": string;
  medium?: string;
  markings: null;
  signed?: string;
  inscribed: null;
  provenance?: string;
  dimensions?: string;
  dimensions_raw?: {
    depth: [string, string];
    height: [string, string];
    width: [string, string];
  };
  creditline?: string;
  description?: string;
  justification: null;
  gallery_text?: string;
  label_text?: string;
  videos: null;
  on_display: null;
  "woe:country": "string";
  type: "Drawing" | "";
  images: Array<Image>;
  participants: Array<Participant>;
  "woe:country_name": string;
  is_loan_object: number;
};

export type GetRandomObjectResponse = {
  object: Object;
  stat: Stat;
  event_publishing_state: "ok";
};

export type ObjectColor = {
  color: string;
  closest_crayola: string;
  closest_css3: string;
  closest_css4: string;
};

export type GetObjectColorsResponse = {
  object_id: string;
  colors: Array<ObjectColor>;
  stat: Stat;
  event_publishing_state: "ok";
};
