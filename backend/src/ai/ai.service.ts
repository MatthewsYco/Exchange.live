import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AiService {
    private readonly logger = new Logger(AiService.name);
    private readonly BASE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

    constructor(private readonly httpService: HttpService) { }

    async computeSurplus(monthlyIncome: number, transactions: any[], currentBalance: number) {
        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.BASE_URL}/decision/surplus`, {
                    monthly_income: monthlyIncome,
                    recent_transactions: transactions,
                    current_balance: currentBalance,
                }),
            );
            return response.data;
        } catch (error) {
            this.logger.error('Failed to compute surplus via AI Service', error);
            throw error;
        }
    }

    async computeAllocation(surplus: number, behavior: any) {
        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.BASE_URL}/decision/allocate`, {
                    surplus,
                    behavior,
                }),
            );
            return response.data;
        } catch (error) {
            this.logger.error('Failed to compute allocation via AI Service', error);
            throw error;
        }
    }

    async getMarketData(symbols: string[]) {
        try {
            const symbolsStr = symbols.join(',');
            const response = await firstValueFrom(
                this.httpService.get(`${this.BASE_URL}/market/screener?symbols=${symbolsStr}`),
            );
            return response.data;
        } catch (error) {
            this.logger.error('Failed to fetch market data from AI Service', error);
            return [];
        }
    }
}
