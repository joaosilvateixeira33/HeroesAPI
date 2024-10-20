export const personagemSchema = {
    type: 'object',
    properties: {
      realName: { type: 'string' },
      nickname: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['realName', 'nickname', 'description'],
    additionalProperties: false,
};