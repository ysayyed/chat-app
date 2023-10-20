import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  receiver: string;

  @IsBoolean()
  @IsNotEmpty()
  isAccepted: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isRejected: boolean;
}
