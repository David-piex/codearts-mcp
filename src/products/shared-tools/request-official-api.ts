import {
  createOfficialApiRequestHandler,
  type OfficialApiRequestInput,
  type OfficialApiRequestResult
} from "../official-api.js";

export type OfficialApiRequestClient = {
  requestOfficialApi: (input: OfficialApiRequestInput) => Promise<OfficialApiRequestResult>;
};

export { createOfficialApiRequestHandler };
