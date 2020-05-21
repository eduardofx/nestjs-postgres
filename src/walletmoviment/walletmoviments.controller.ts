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
import { CreateWalletMovimentDto } from './dto/create-walletmoviment.dto';
import { WalletMovimentsService } from './walletmoviments.service';
import { AuthGuard } from '@nestjs/passport';
import { WalletMoviment as WalletMovimentEntity } from './walletmoviment.entity';
import { WalletMovimentDto } from './dto/walletmoviment.dto';
import { Request } from 'express';
import { UpdateWalletMovimentDto } from './dto/update-walletmoviment.dto';

@Controller('walletmoviments')
@ApiUseTags('walletmoviments')
export class WalletMovimentsController {
    constructor(private readonly walletmovimentsService: WalletMovimentsService) {}

    @Get()
    @ApiOkResponse({ type: [WalletMovimentDto] })
    findAll(): Promise<WalletMovimentDto[]> {
        return this.walletmovimentsService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: WalletMovimentDto })
    @ApiImplicitParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<WalletMovimentDto> {
        return this.walletmovimentsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: WalletMovimentEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createWalletMovimentDto: CreateWalletMovimentDto,
        @Req() request,
    ): Promise<WalletMovimentEntity> {
        return this.walletmovimentsService.create(request.user.id, createWalletMovimentDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: WalletMovimentEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Req() request: Request,
        @Body() updateWalletMovimentDto: UpdateWalletMovimentDto,
    ): Promise<WalletMovimentEntity> {
        return this.walletmovimentsService.update(id, request.user.id, updateWalletMovimentDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: WalletMovimentEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('id', new ParseIntPipe()) id: number,
        @Req() request: Request,
    ): Promise<WalletMovimentEntity> {
        return this.walletmovimentsService.delete(id, request.user.id);
    }
}
