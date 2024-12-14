const SendEmailCommand = jest.fn();

jest.mock('@aws-sdk/client-ses', () => {
	const sendMock = jest.fn();

	return {
		SESClient: jest.fn(() => ({
			send: sendMock,
		})),
		SendEmailCommand,
	}
});

export default { SendEmailCommand };