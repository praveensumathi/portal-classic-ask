export type PhonePePaymentInitiateResponse = {
  success: boolean;
  code: string;
  message: string;
  data: PhonePePaymentInitiateData;
};

export type PhonePePaymentInitiateData = {
  merchantId: string;
  merchantTransactionId: string;
  instrumentResponse: InstrumentResponse;
};

export type InstrumentResponse = {
  type: string;
  redirectInfo: RedirectInfo;
};

export type RedirectInfo = {
  url: string;
  method: string;
};

export type PhonePePaymentStatucCheckResponse = {
  success: boolean;
  code: string;
  message: string;
  data: PhonePePaymentStatucCheckData;
};

export type PhonePePaymentStatucCheckData = {
  merchantId: string;
  merchantTransactionId: string;
  transactionId: string;
  amount: number;
  state: string;
  responseCode: string;
};
