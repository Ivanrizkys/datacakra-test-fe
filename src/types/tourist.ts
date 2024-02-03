export interface Tourist {
  $id: string;
  createdat: Date;
  id: string;
  tourist_email: string;
  tourist_profilepicture: string;
  tourist_location: string;
  tourist_name: string;
}

export interface ListTourist {
  page: string;
  per_page: number;
  totalrecord: number;
  total_pages: number;
  data: Tourist[];
}

export interface UpdateTouristRequest {
  id: string;
  tourist_email: string;
  tourist_location: string;
  tourist_name: string;
}

export interface CreateTouristRequest {
  tourist_email: string;
  tourist_location: string;
  tourist_name: string;
}
