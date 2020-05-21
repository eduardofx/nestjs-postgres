import {
    Controller,
    Req,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
} from '@nestjs/common';
import {
    ApiUseTags,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiImplicitParam,
} from '@nestjs/swagger';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletsService } from './wallets.service';
import { AuthGuard } from '@nestjs/passport';
import { Wallet as WalletEntity } from './wallet.entity';
import { WalletDto } from './dto/wallet.dto';
import { Request } from 'express';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallets')
@ApiUseTags('wallets')
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) {}

    @Get()
    @ApiOkResponse({ type: [WalletDto] })
    findAll(): Promise<WalletDto[]> {
        return this.walletsService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: WalletDto })
    @ApiImplicitParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<WalletDto> {
        return this.walletsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: WalletEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createWalletDto: CreateWalletDto,
        @Req() request,
    ): Promise<WalletEntity> {
        return this.walletsService.create(request.user.id, createWalletDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: WalletEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Req() request: Request,
        @Body() updateWalletDto: UpdateWalletDto,
    ): Promise<WalletEntity> {
        return this.walletsService.update(id, request.user.id, updateWalletDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: WalletEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('id', new ParseIntPipe()) id: number,
        @Req() request: Request,
    ): Promise<WalletEntity> {
        return this.walletsService.delete(id, request.user.id);
    }
}
