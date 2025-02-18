import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//puedo obtener el usuario con el jwt
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
